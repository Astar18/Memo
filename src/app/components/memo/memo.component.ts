import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { content } from 'html2canvas/dist/types/css/property-descriptors/content';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
  memo = {
    title: '',
    content: '',
    recipient: '',
    encargado: '',
    sucursal: '',
    location: '',
    branch: '',
    additionalField: ''
  };
  showAdditionalField = false;
  mostrarEncargado = false;

  constructor() { }

  ngOnInit(): void { }

  onSucursal(event: any): void {
    this.memo.sucursal = event.target.value;

    if (this.memo.sucursal === 'Marketing') {
      this.mostrarEncargado = this.memo.sucursal === 'Marketing';
      this.memo.encargado = 'Ing. Alex Gordon';
    }if (this.memo.sucursal === 'Dilipa Villaflora') {
      this.memo.encargado = 'Sr. John Yanez';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Villaflora';
    } if (this.memo.sucursal === 'Dilipa Carrión') {
      this.memo.encargado = 'Sra. Cristina Pilco';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Carrión';
    }if (this.memo.sucursal === 'Dilipa Portoviejo') {
      this.memo.encargado = 'Ing. Jose Zambrano';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Portoviejo';
    }if (this.memo.sucursal === 'Ventas Externas') {
      this.memo.encargado = 'Sr. Byron Mariño';
      this.mostrarEncargado = this.memo.sucursal === 'Ventas Externas';
    }if (this.memo.sucursal === 'Centro de Acopio') {
      this.memo.encargado = 'Sr. Miguel Yepez';
      this.mostrarEncargado = this.memo.sucursal === 'Centro de Acopio';
    }if (this.memo.sucursal === 'Dilipa Oficinas') {
      this.memo.encargado = 'Sra. Josselyn Chavez';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Oficinas';
    }if (this.memo.sucursal === 'Dilipa Santa Clara') {
      this.memo.encargado = 'Sr. Rolando Galarza';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Santa Clara';
    }if (this.memo.sucursal === 'Dilipa Tumbaco') {
      this.memo.encargado = 'Sra. Mariana Llumihucsi';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Tumbaco';
    }if (this.memo.sucursal === 'Dilipa Tumbaco 2') {
      this.memo.encargado = 'Sra. Maria Llumihucsi';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Tumbaco 2';
    }if (this.memo.sucursal === 'Dilipa Ambato') {
      this.memo.encargado = 'Sra. Maria Eugenia Andrade';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Ambato';
    }if (this.memo.sucursal === 'Dilipa Ibarra') {
      this.memo.encargado = 'Sr. Jorge Perez';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Ibarra';
    }if (this.memo.sucursal === 'Dilipa Santo Domingo 1') {
      this.memo.encargado = 'Sra. Elizabeth Tapia';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Santo Domingo 1';
    }if (this.memo.sucursal === 'Dilipa Santo Domingo 2') {
      this.memo.encargado = 'Sr. Washigton Segura';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Santo Domingo 2';
    }if (this.memo.sucursal === 'Dilipa Santo Domingo 3') {
      this.memo.encargado = 'Sra. Marisol Briones';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Santo Domingo 3';
    }if (this.memo.sucursal === 'Dilipa Kennedy') {
      this.memo.encargado = 'Sra. Daly Ramos';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Kennedy';
    }if (this.memo.sucursal === 'Dilipa Calderón') {
      this.memo.encargado = 'Sr. Cristian Molina';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Calderón';
    }if (this.memo.sucursal === 'Dilipa Cotocollao') {
      this.memo.encargado = 'Sra. Alexandra Heredia';
      this.mostrarEncargado = this.memo.sucursal === 'Dilipa Cotocollao';
    }if (this.memo.sucursal === 'Sistemas') {
      this.memo.encargado = 'Ing. Marlon Montero';
      this.mostrarEncargado = this.memo.sucursal === 'Sistemas';
    }if (this.memo.sucursal === 'Contabilidad') {
      this.memo.encargado = 'Lcda. Nelly Panchy|';
      this.mostrarEncargado = this.memo.sucursal === 'Contabilidad';
    }if (this.memo.sucursal === 'Recursos Humanos') {
      this.memo.encargado = 'Dra. Mariana Jacome';
      this.mostrarEncargado = this.memo.sucursal === 'Recursos Humanos';
    }if (this.memo.sucursal === 'Compras') {
      this.memo.encargado = 'Ing. Dario Segura';
      this.mostrarEncargado = this.memo.sucursal === 'Compras';
    }if (this.memo.sucursal === 'Otros') {
      this.memo.encargado = ' ';
      this.mostrarEncargado = this.memo.sucursal === 'Otros' ;
      readonly: false;
    }



}
  onBranchChange(event: any): void {
    this.memo.branch = event.target.value;
    this.showAdditionalField = this.memo.branch === 'specificBranch';
  }
  onEncargado(event: any): void {

    this.memo.recipient = event.target.value;
    this.showAdditionalField = this.memo.recipient === 'specificRecipient';
  }
  printMemo(): void {
    const pdf = new jspdf.jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: 'a4'// Tamaño A5 en puntos (595 x 842)

    });

    const memoContainer = document.getElementById('pdf-content') as HTMLElement;

    html2canvas(memoContainer).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Calcular el tamaño de la imagen para que se ajuste al tamaño A5
      const width = pdf.internal.pageSize.getWidth() / 2; // Dividir por 2 para obtener dos imágenes en la misma página
      const height = pdf.internal.pageSize.getHeight();

      // Agregar la primera imagen en la posición (0, 0)
      pdf.addImage(imgData, 'PNG', 1, 0, width, height);

      // Agregar la segunda imagen en la posición (width, 0) para que esté al lado de la primera
      pdf.addImage(imgData, 'PNG', width, 1, width, height);

      // Guardar el PDF
      pdf.save('memo.pdf');
    });
  }
}
