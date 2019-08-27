import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from './../../services/loading.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public currentUser: any = null;
  public userId: string = null;
  public subscriptions: Subscription[] = [];
  public uploadPercent: number = 0;
  public downloadUrl: Observable<string>;
  public photoUrl: string = null;

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private fs: AngularFireStorage,
    private db: AngularFirestore,
    private location: Location,
    private toastrService: ToastrService
  ) { 
    this.loadingService.isLoading.next(true);

  }

  ngOnInit() {
    this.subscriptions.push(
      this.auth.currentUser.subscribe(user => {
        this.currentUser = user;
        this.loadingService.isLoading.next(false);
      })
    );

    this.subscriptions.push(
      this.route.paramMap.subscribe(params => {
        this.userId = params.get('userId');
      })
    );
  }

  public uploadFile(event): void {
    const file = event.target.files[0];
    const filePath = `${file.name}_${this.currentUser.id}`;
    const fileRef = this.fs.ref(filePath);
    const task = this.fs.upload(filePath, file);


    // observe the percentage changes
    this.subscriptions.push(
      task.percentageChanges().subscribe(percentage => {
        if (percentage < 100) {
          this.loadingService.isLoading.next(true);
        } else {
          this.loadingService.isLoading.next(false);
        }
        this.uploadPercent = percentage;
      })
    );

      // get notified when the download URL is avaliable
      task.snapshotChanges().pipe(
        finalize(() => {
          this.downloadUrl = fileRef.getDownloadURL();
          this.downloadUrl.subscribe(url => this.photoUrl = url);
        })
      ).subscribe();

  }

  public save(): void {
    let photo;
    
    if (this.photoUrl) {
      photo = this.photoUrl;
    } else {
      photo = this.currentUser.photoURL;
    }

    const user = Object.assign({}, this.currentUser, {photoURL: photo});
    const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.id}`);
    userRef.set(user)
    this.toastrService.success("Your profile was successfully updated!");
    this.location.back();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}