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
    title: '',
    content: '',
    recipient: '',
    gender: '',
    location: '',
    branch: '',
    additionalField: ''
  };
  showAdditionalField = false;

  constructor() { }

  ngOnInit(): void { }

  onGenderChange(event: any): void {
    this.memo.gender = event.target.value;
  }

  onBranchChange(event: any): void {
    this.memo.branch = event.target.value;
    this.showAdditionalField = this.memo.branch === 'specificBranch';
  }

  printMemo(): void {
    const pdf = new jspdf.jsPDF({
      orientation: 'landscape',
      unit: 'pt',
      format: 'a4'// Tamaño A5 en puntos (595 x 842)
    });

    const memoContainer = document.getElementById('memo-container') as HTMLElement;

    html2canvas(memoContainer).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');

      // Calcular el tamaño de la imagen para que se ajuste al tamaño A5
      const width = pdf.internal.pageSize.getWidth() / 2; // Dividir por 2 para obtener dos imágenes en la misma página
      const height = pdf.internal.pageSize.getHeight();

      // Agregar la primera imagen en la posición (0, 0)
      pdf.addImage(imgData, 'PNG', 0, 0, width, height);

      // Agregar la segunda imagen en la posición (width, 0) para que esté al lado de la primera
      pdf.addImage(imgData, 'PNG', width, 0, width, height);

      // Guardar el PDF
      pdf.save('memo.pdf');
    });
  }
}
