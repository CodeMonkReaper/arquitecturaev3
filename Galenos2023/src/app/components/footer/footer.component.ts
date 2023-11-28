import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  standalone:true,
  selector: 'app-footer',
  imports: [MatIconModule,NgIconsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

}
