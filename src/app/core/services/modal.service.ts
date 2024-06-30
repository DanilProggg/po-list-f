import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IPare } from '../models/IPare';
import { IModal } from '../models/IModal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() {}

  $pares = new Subject<IModal>();

}
