import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Step {
  num: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-how-it-works',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-it-works.html',
  styleUrl: './how-it-works.css',
})
export class HowItWorksComponent {
  steps: Step[] = [
    {
      num: '01',
      title: 'Registruj se i overi identitet',
      text: 'Kreiraj nalog za manje od dva minuta i potvrdi identitet, kako bi svaka ponuda u sali bila pouzdana i obavezujuća.',
    },
    {
      num: '02',
      title: 'Prati lotove i postavi limit',
      text: 'Dodaj lotove na listu praćenja i unapred zadaj maksimalnu cenu — BidMaster licitira umesto tebe do tog limita.',
    },
    {
      num: '03',
      title: 'Licitiraj uživo, pobednik plaća odmah',
      text: 'Prati sat kako otkucava, uskoči poslednjeg trenutka i osvoji lot. Plaćanje i dostava kreću automatski po zatvaranju.',
    },
  ];
}
