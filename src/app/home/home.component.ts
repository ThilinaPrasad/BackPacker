import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isSearchBarOpened = false;
  inCardView = true;
  ngOnInit() {}
  constructor(private router: Router, private userService: UserService) {}

  view() {
    this.router.navigate(
      [
        'home',
        'home',
        'view'
      ] /*,{{ queryParams: { email: regemail, password:  regpassword} }}*/
    );
  }
  toggleview() {
    this.inCardView = !this.inCardView;
  }
}
