import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup = this.formBuilder.group({
    rut: ['', [Validators.required, Validators.maxLength(12)]],
    nombre: ['', [Validators.required, Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.maxLength(60)]]
  });

  constructor(private formBuilder: FormBuilder, private authservice:AuthService,private toastr:ToastrService) { }



  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.authservice.createUser(formData).subscribe(
        (response) => {
          this.toastr.success('registro exitoso','completado')
          console.log('Registro exitoso', response);
          alert('registro exitoso')
        },
        (error) => {
          this.toastr.error('error en el registro','error')
          console.error('Error en el registro', error);
        }
      );
    }
  }
}
