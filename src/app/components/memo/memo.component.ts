import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
  memo = {
    title: 'Memo Title',
    content: '',
    recipient: '',
    encargado: '',
    encargadoD: '',
    sucursal: '',
    location: '',
    branch: '',
    additionalField: '',
    dirigidoD: '',
    date: '',
    time: ''
  };

  showAdditionalField = false;
  mostrarEncargado = false;
  mostrarEncargadoD = false;
  isEncargadoEditable = false; // Added to control the readonly attribute of encargado input
  isEncargadoEditable2 = false; // Added to control the readonly attribute of encargadoD input

  private encargados: { [key: string]: string } = {
    'Marketing': 'Ing. Alex Gordon',
    'Dilipa Villaflora': 'Sr. John Yanez',
    'Dilipa Carrión': 'Sra. Cristina Pilco',
    'Dilipa Portoviejo': 'Ing. Jose Zambrano',
    'Ventas Externas': 'Sr. Byron Mariño',
    'Centro de Acopio': 'Sr. Miguel Yepez',
    'Dilipa Oficinas': 'Sra. Josselyn Chavez',
    'Dilipa Santa Clara': 'Sr. Rolando Galarza',
    'Dilipa Tumbaco': 'Sra. Mariana Llumihucsi',
    'Dilipa Tumbaco 2': 'Sra. Maria Llumihucsi',
    'Dilipa Ambato': 'Sra. Maria Eugenia Andrade',
    'Dilipa Ibarra': 'Sr. Jorge Perez',
    'Dilipa Santo Domingo 1': 'Sra. Elizabeth Tapia',
    'Dilipa Santo Domingo 2': 'Sr. Washigton Segura',
    'Dilipa Santo Domingo 3': 'Sra. Marisol Briones',
    'Dilipa Kennedy': 'Sra. Daly Ramos',
    'Dilipa Calderón': 'Sr. Cristian Molina',
    'Dilipa Cotocollao': 'Sra. Alexandra Heredia',
    'Sistemas': 'Ing. Marlon Montero',
    'Contabilidad': 'Lcda. Nelly Panchy',
    'Recursos Humanos': 'Dra. Mariana Jacome',
    'Compras': 'Ing. Dario Segura',
    'Otros': ''
  };

  constructor() { }

  ngOnInit(): void {
    this.setDateTime();
   }

  setDateTime(): void {
    const now = new Date();
    this.memo.date = now.toLocaleDateString();
    this.memo.time = now.toLocaleTimeString();
  }
  onSucursal(event: any): void {
    const sucursal = event.target.value;
    this.memo.sucursal = sucursal;
    if (sucursal === 'Otros') {
      this.memo.encargado = '';
      this.isEncargadoEditable = true;
    } else {
      this.memo.encargado = this.encargados[sucursal] || '';
      this.isEncargadoEditable = false;
    }
    this.mostrarEncargado = !!this.memo.encargado || this.isEncargadoEditable;
  }

  onDirigido(event: any): void {
    const dirigidoD = event.target.value;
    this.memo.dirigidoD = dirigidoD;
    this.isEncargadoEditable2 = dirigidoD === 'Otros'; // Simplificar la lógica
    this.memo.encargadoD = this.isEncargadoEditable2 ? '' : this.encargados[dirigidoD] || '';
    this.mostrarEncargadoD = !!this.memo.encargadoD || this.isEncargadoEditable2;
  }

  onBranchChange(event: any): void {
    const branch = event.target.value;
    this.memo.branch = branch;
    this.showAdditionalField = branch === 'specificBranch';
  }

  printMemo(): void {
    const data = document.querySelectorAll('pdf-contend'); // Cambio aquí
    if (data) {
      const canvasPromises = Array.from(data).map((element: any) => {
        return html2canvas(element, {
          scrollX: 0,
          scrollY: 0,
          width: element.scrollWidth,
          height: element.scrollHeight,
          backgroundColor: '#fff'
        });
      });

      Promise.all(canvasPromises)
  .then((canvases) => {
    const pdf = new jspdf.jsPDF('landscape', 'mm', 'a4');
    canvases.forEach((canvas, index) => {
      const imgWidth = 297;
      const imgHeight = 210;
      const contentDataURL = canvas.toDataURL('image/png');
      if (index === 0) {
        pdf.addImage(contentDataURL, 'PNG', 10, 10, imgWidth, imgHeight);
      } else {
        pdf.addImage(contentDataURL, 'PNG', imgWidth + 20, 10, imgWidth, imgHeight);
      }
    });
    pdf.save('memo.pdf');
  })
  .catch((error) => {
    console.error('Error al generar la imagen:', error);
  });

    }
  }


}
