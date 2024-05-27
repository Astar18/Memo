import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-memo',
  templateUrl: './memo.component.html',
  styleUrls: ['./memo.component.css']
})
export class MemoComponent implements OnInit {
  @ViewChild('pdfContent1')
  pdfContent1!: ElementRef;
  @ViewChild('pdfContent2')
  pdfContent2!: ElementRef;

  memo = {
    title: 'Memo Dilipa',
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
    time: '',
    tecnitaser: '',
    marca: '',
    descripcion: '',
    numeroSerie: '',
    estado: '',
    cargador: '',
    reporteCaja: '',
    notaPedido: '',
    formularioDevolucion: '',
    rebornGrande: '',
    rebornPequeno: '',
    rolloPrecio: '',
    rolloSeguridad: '',
  };

  showAdditionalField = false;
  showAdditionalFieldForSistemas = false;
  showAdditionalFieldForActivos = false;
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
    // Si se selecciona "Sistemas", mostrar el campo adicional
  if (dirigidoD === 'Sistemas') {
    this.showAdditionalFieldForSistemas = true;
  } else {
    this.showAdditionalFieldForSistemas = false;
 }

}

  onBranchChange(event: any): void {
    const branch = event.target.value;
    this.memo.branch = branch;
    this.showAdditionalField = branch === 'specificBranch';
  }

  printMemo(): void {
    const data = [this.pdfContent1.nativeElement, this.pdfContent2.nativeElement];

    const canvasPromises = data.map((element: any) => {
      return html2canvas(element, {
        scrollX: 0,
        scrollY: 0,
        width: 260, // Width of the A4 page in mm
        height: 320, // Height of the A4 page in mm
        backgroundColor: '#fff'
      });
    });

    Promise.all(canvasPromises)
      .then((canvases) => {
        const pdf = new jspdf.jsPDF('landscape', 'mm', 'a2');
        let xOffset = 0;
        canvases.forEach((canvas, index) => {
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', xOffset, 0,150, 200); // A4 size
          xOffset += 300; // Assuming each canvas is A4 width
        });
        pdf.save('memo.pdf');
      })
      .catch((error) => {
        console.error('Error al generar la imagen:', error);
      });
  }
}
