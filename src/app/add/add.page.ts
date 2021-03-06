import { Component, OnInit } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
// tslint:disable-next-line:max-line-length
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {UtilitiesService} from '../services/utilities.service';
import {Platform} from '@ionic/angular';
import {ReadingsPage} from './readings/readings.page';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {

  picture;
  isLoading = false;
  isFlashOn = false;
  isRearCamOn = true;
  rootPage: any;
  transferData = {location: null,
    picture: null,
    sensorData: [],
    timeStamp: null,
    userId: null,
    recommendation: {rating: 1, text: null}
  };
  constructor(private router: Router,
              private camera: Camera,
              private cameraPreview: CameraPreview,
              private file: File,
              private storage: AngularFireStorage,
              private utilitiesService: UtilitiesService,
              private platform: Platform,
              private route: ActivatedRoute,
              private userService: UserService) {
    this.utilitiesService.backToCameraPreview.subscribe((data) => {
      this.picture = null;
      this.isLoading = false;
      this.startCameraPreview();
    });
    this.transferData.userId = this.userService.loggedUser.authData.uid;
    route.queryParams.subscribe((data: any) => {
      this.transferData.location = JSON.parse(data.locationData);
    });
  }

  async ngOnInit() {
    await this.platform.ready().then(() => {
      this.rootPage = ReadingsPage;
    });
  }

  async ionViewWillEnter() {
    await this.platform.ready();
    this.isLoading = false;
    this.startCameraPreview();
  }

  public ionViewWillLeave() {
    this.cameraPreview.stopCamera();
  }

  startCameraPreview() {
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 56,
      width: window.screen.width,
      height: window.screen.width,
      camera: 'rear',
      tapPhoto: false,
      previewDrag: false,
      toBack: false,
      alpha: 1
    };

// start camera
    this.cameraPreview.startCamera(cameraPreviewOpts);
    this.cameraPreview.setFocusMode('auto');
  }

  capture() {
    // this.router.navigate(['./tabs/add/readings'], { queryParams: {transferData: JSON.stringify(this.transferData)} });
    this.isLoading = true;
    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 50
    };

    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.cameraPreview.stopCamera();
      this.transferData.picture = this.picture;
      this.router.navigate(['tabs', 'location', 'add', 'readings'], { queryParams: {transferData: JSON.stringify(this.transferData)} });
    }, (err) => {
      console.log(err);
      // add alert here
    });
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
    this.isRearCamOn = !this.isRearCamOn;
    if (this.isFlashOn) {
      this.cameraPreview.setFlashMode('on');
    } else {
      this.cameraPreview.setFlashMode('off');
    }
  }

  toggleFlash() {
    if (!this.isFlashOn) {
      this.cameraPreview.setFlashMode('on');
      this.isFlashOn = true;
    } else {
      this.cameraPreview.setFlashMode('off');
      this.isFlashOn = false;
    }
  }

}
