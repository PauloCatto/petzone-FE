import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { PetService } from 'src/app/services/pet.service';

@Component({
  selector: 'app-reserve-dialog',
  templateUrl: './reserve-dialog.component.html',
  styleUrls: ['./reserve-dialog.component.scss'],
})
export class ReserveDialogComponent {
  reserveForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReserveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private petService: PetService
  ) {
    this.reserveForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
    });
  }

  ngOninit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log(this.data)
    if (this.reserveForm.valid) {
      const reservationData = {
        petId: this.data.id,
        petName: this.data.name,
        petType: this.data.type,
        ...this.reserveForm.value,
      };

      this.petService.sendReservation(reservationData).subscribe({
        next: (response: any) => {
          this.snackBar.open(
            'Manifestação de interesse enviada com sucesso! Em breve entraremos em contato.',
            'Fechar',
            {
              duration: 3000,
              panelClass: ['snackbar-success'],
              verticalPosition: 'top' as MatSnackBarVerticalPosition,
            }
          );
          console.log('Resposta do backend:', response);
          this.dialogRef.close(true);
        },
        error: (error: any) => {
          this.snackBar.open(
            'Erro ao enviar manifestação de interesse. Tente novamente mais tarde.',
            'Fechar',
            {
              duration: 3000,
              panelClass: ['snackbar-error'],
              verticalPosition: 'top' as MatSnackBarVerticalPosition,
            }
          );
          console.error('Erro ao enviar dados para o backend:', error);
        },
      });
    }
  }
}
