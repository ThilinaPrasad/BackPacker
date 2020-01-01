import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabsComponent } from './tabs.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../home/home.module').then(m => m.HomeModule)
          },
          {
            path: 'home-map',
            loadChildren: () => import('../home-map/home-map.module').then( m => m.HomeMapPageModule)
          },
        ]
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../settings/settings.module').then(m => m.SettingsModule)
      },
      {
        path: 'location',
        loadChildren: () =>
        import('../location/location.module').then(m => m.LocationPageModule)
      },
      {
        path: 'add',
        loadChildren: () => import('../add/add.module').then( m => m.AddPageModule)
      },
      {
        path: 'view-location',
        loadChildren: () => import('../view-location/view-location.module').then( m => m.ViewLocationPageModule)
      }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsComponent]
})
export class TabsModule {}
