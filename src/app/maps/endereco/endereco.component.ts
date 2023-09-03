import { Component,EventEmitter, OnInit, Output,Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address.model';
import { ResponseMaps } from 'src/app/model/response-maps.model';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.scss']
})
export class EnderecoComponent implements OnInit{

  formEndereco!: FormGroup;
  loading = false;
  @Input() responseMaps: ResponseMaps = new ResponseMaps();


  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.criaFormEndereco();
  }

  criaFormEndereco(){
    this.formEndereco = this.formBuilder.group({
      neighbourhood: [''],
      city: [''],
      municipality: [''],
      county: [''],
      state_district: [''],
      name: [''],
      state: [''],
      postcode: ['']
    });

  }

  limpaEndereco(){
    this.formEndereco = this.formBuilder.group({
      neighbourhood: [''],
      city: [''],
      municipality: [''],
      county: [''],
      state_district: [''],
      name: [''],
      state: [''],
      postcode: ['']
    });
  }

  recebeEndereco(response: any) {
    let endereco: Address = new Address();
    endereco = response.address;
    this.formEndereco.patchValue({
      neighbourhood: endereco.neighbourhood ? endereco.neighbourhood : (endereco.quarter ? endereco.quarter: endereco.road),
      city: endereco.city,
      municipality: endereco.municipality,
      county: endereco.county,
      state_district: endereco.state_district,
      state: endereco.state,
      postcode: endereco.postcode
    })
  }

}
