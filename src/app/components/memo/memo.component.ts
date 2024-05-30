
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { MemoService } from '../../service/memo.service';


export interface Memo {
  id?: number;
  title: string;
  content: string;
  recipient: string;
  encargado: string;
  encargadoD: string;
  sucursal: string;
  location: string;
  branch: string;
  additionalField: string;
  dirigidoD: string;
  date: string;
  time: string;
  tecnitaser: string;
  marca: string;
  descripcion: string;
  numeroSerie: string;
  estado: string;
  cargador: string;
  reporteCaja: string;
  notaPedido: string;
  formularioDevolucion: string;
  rebornGrande: string;
  rebornPequeno: string;
  rolloPrecio: string;
  rolloSeguridad: string;
}

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

  memo: Memo ={
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

  memos: Memo[] = [];
  showAdditionalField = false;
  showAdditionalFieldForSistemas = false;
  showAdditionalFieldForActivos = false;
  mostrarEncargado = false;
  mostrarEncargadoD = false;
  isEncargadoEditable = false; // Added to control the readonly attribute of encargado input
  isEncargadoEditable2 = false; // Added to control the readonly attribute of encargadoD input
  formattedContent  = '';
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

  constructor(@Inject(MemoService) private memoService: MemoService) { }

  ngOnInit(): void {
    this.setDateTime();
  }

  onInput(event: Event): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.memo.content = textarea.value;
    this.formattedContent = this.formatContent(this.memo.content);
  }

  formatContent(content: string): string {
    const maxLength = 40;
    let formatted = '';
    let lineLength = 0;

    for (const char of content) {
      formatted += char;
      lineLength++;
      if (lineLength >= maxLength) {
        formatted += '\n';
        lineLength = 0;
      }
    }

    return formatted;
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
  crearMemo(): void {
    if (!this.memo.title || !this.memo.content || !this.memo.recipient) {
      alert('Falta completar campos obligatorios');
      return;
    }

    this.memoService.crearMemo(this.memo).subscribe(
      (data: Memo) => {
        this.memos.push(data);
        this.resetMemo();
      },
      (error) => {
        console.error('Error al crear el memo:', error);
      }
    );
  }

  actualizarMemo(memo: Memo): void {
    if (!memo.title || !memo.content || !memo.recipient) {
      alert('Falta completar campos obligatorios');
      return;
    }

    this.memoService.actualizarMemo(memo).subscribe(
      (data: Memo) => {
        const index = this.memos.findIndex(m => m.id === memo.id);
        this.memos[index] = data;
        this.resetMemo();
      },
      (error) => {
        console.error('Error al actualizar el memo:', error);
      }
    );
  }

  eliminarMemo(id: number): void {
    this.memoService.eliminarMemo(id).subscribe(
      () => {
        this.memos = this.memos.filter(m => m.id !== id);
      },
      (error) => {
        console.error('Error al eliminar el memo:', error);
      }
    );
  }
  resetMemo(): void {
    const currentDate = this.memo.date;
    const currentTime = this.memo.time;
    this.memo = {
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
      date: currentDate,
      time: currentTime,
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
      rolloSeguridad: ''
    };
    this.formattedContent = '';
  }




  printMemo(): void {
    const data = [this.pdfContent1.nativeElement, this.pdfContent2.nativeElement];

    const canvasPromises = data.map((element: any) => {
      return html2canvas(element, {
        scrollX: 5,
        scrollY: 0,
        width: 420, // Width
        height: 500, // Height
        backgroundColor: '#fff'
      });
    });

    Promise.all(canvasPromises)
      .then((canvases) => {
        const pdf = new jspdf.jsPDF('landscape', 'mm', 'a4');

        let xOffset = 0;
        canvases.forEach((canvas, index) => {
          const imgData = canvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', xOffset, 0,150, 200); // A4 size
          xOffset += 150; // Assuming each canvas is A4 width
        });
        pdf.save('memo.pdf');
        const currentDate = this.memo.date;
        const currentTime = this.memo.time;
        // Restablecer todos los campos del memo a cadenas vacías después de guardar el PDF
        this.memo = {
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
          date: currentDate,
          time: currentTime,
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
        // Restablecer los campos de texto con ngModel a cadenas vacías también
        this.formattedContent = '';
      })
      .catch((error) => {
        console.error('Error al generar la imagen:', error);
      });
  }
}
