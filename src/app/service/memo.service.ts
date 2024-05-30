import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MemoComponent } from '../components/memo/memo.component';
import { Observable } from 'rxjs';
import { Memo } from '../components/memo/memo.component';


@Injectable({
  providedIn: 'root'
})
export class MemoService {
  private url = 'assets/memo.json';
  constructor(private http: HttpClient) { }
  getMemos(): Observable<Memo[]> {
    return this.http.get<Memo[]>(this.url);
  }

  crearMemo(memo: Memo): Observable<Memo> {
    // Aquí deberías implementar la lógica para añadir el memo al archivo JSON
    return this.http.post<Memo>(this.url, memo);
  }

  actualizarMemo(memo: Memo): Observable<Memo> {
    // Aquí deberías implementar la lógica para actualizar el memo en el archivo JSON
    return this.http.put<Memo>(`${this.url}/${memo.id}`, memo);
  }


  eliminarMemo(id: number): Observable<void> {
    // Aquí deberías implementar la lógica para eliminar el memo del archivo JSON
    return this.http.delete<void>(`${this.url}/${id}`);
  }



}
