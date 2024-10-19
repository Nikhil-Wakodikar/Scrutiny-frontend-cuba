import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HttpService } from '../../../service/http/http.service'
import { ToastService } from '../../../service/toast/toast.service'
import { Router } from '@angular/router';


const votingFormDetails = {
  "numberOfConstituency": 101,
  "nameOfConstituency": "Downtown District",

  "numberOfPollingStation": 15,
  "nameOfPollingStation": "City Hall Center",
  "totalElectors": {
    "male": 2000,
    "female": 1800,
    "tg": 50,
    "total": 3850
  },
  "personsVoted": {
    "male": 1500,
    "female": 1400,
    "tg": 30,
    "total": 2930
  },
  "tenderedVotes": null,
  "challengedVotes": null,
  "proxyVotesByCSVs": null,
  "votersEPIC": 2800,
  "votersAlternativeDocument": 100,
  "votersRule49O": 3,
  "pollingAgents": 0,
  "overseasElectors": 20,
  "buCuVvpatUsed": {
    "ballotUnit": 4,
    "controlUnit": 4,
    "vvpat": 2,

  },

  "buCuVvpatChanged": {
    "ballotUnit": false,
    "controlUnit": true,
    "vvpat": false,
  },
  "changeTimeReason": null,
  "totalAsdVoters": null,
  "totalAsdVotesCast": null,
  "violencePollInterruption": false,
  "complaintsReceived": true,
  "recommendataionOfRepoll": false
}

@Component({
  selector: 'app-scrutiny-form',
  templateUrl: './scrutiny-form.component.html',
  styleUrl: './scrutiny-form.component.scss'
})
export class ScrutinyFormComponent {
  votingForm!: FormGroup;

  showRePollInput: boolean = false
  showPollInterruptionInput: boolean = false

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  buildForm() {
    this.votingForm = this.fb.group({
      numberOfConstituency: [null],
      numberOfPollingStation: [null],
      nameOfConstituency: [null],
      nameOfPollingStation: [null],

      totalElectors: this.fb.group({
        male: [null],
        female: [null],
        tg: [null],
        total: [null]
      }),
      personsVoted: this.fb.group({
        male: [null],
        female: [null],
        tg: [null],
        total: [null]
      }),
      tenderedVotes: [null],
      challengedVotes: [null],
      proxyVotesByCSVs: [null],
      votersEPIC: [null],
      votersAlternativeDocument: [null],
      votersRule49O: [null],
      pollingAgents: [null],
      overseasElectors: [null],
      buCuVvpatUsed: this.fb.group({
        ballotUnit: [null],
        controlUnit: [null],
        vvpat: [null],

      }),

      buCuVvpatChanged: this.fb.group({
        ballotUnit: [false],
        controlUnit: [false],
        vvpat: [false],
      })
      ,
      changeTimeReason: [null],
      totalAsdVoters: [null],
      totalAsdVotesCast: [null],
      violencePollInterruption: [null],
      complaintsReceived: [null],
      recommendataionOfRepoll: [null]
    });

    this.votingForm.get('recommendataionOfRepoll')?.valueChanges.subscribe(value => {
      this.votingForm.addControl('reasonForRepoll', new FormControl(null))
      this.showRePollInput = value === true;
    });

    this.votingForm.get('violencePollInterruption')?.valueChanges.subscribe(value => {
      this.votingForm.addControl('reasonForPollInterruption', new FormControl(null))
      this.showPollInterruptionInput = value === true
    });

    this.calculateTotalElectors()
    this.calculatePersonsVoted()
  }


  //TotalElectors
  calculateTotalElectors() {
    this.votingForm.get('totalElectors.male')?.valueChanges.subscribe((val) => this.updateElectorsTotal());
    this.votingForm.get('totalElectors.female')?.valueChanges.subscribe(() => this.updateElectorsTotal());
    this.votingForm.get('totalElectors.tg')?.valueChanges.subscribe(() => this.updateElectorsTotal());
  }

  updateElectorsTotal() {
    const male = this.votingForm.get('totalElectors.male')?.value || 0;
    const female = this.votingForm.get('totalElectors.female')?.value || 0;
    const tg = this.votingForm.get('totalElectors.tg')?.value || 0;

    const total = male + female + tg;

    this.votingForm.get('totalElectors.total')?.setValue(total);
  }


  calculatePersonsVoted() {
    this.votingForm.get('personsVoted.male')?.valueChanges.subscribe((val) => this.updatePersonsVotedTotal());
    this.votingForm.get('personsVoted.female')?.valueChanges.subscribe(() => this.updatePersonsVotedTotal());
    this.votingForm.get('personsVoted.tg')?.valueChanges.subscribe(() => this.updatePersonsVotedTotal());
  }

  updatePersonsVotedTotal() {
    const male = this.votingForm.get('personsVoted.male')?.value || 0;
    const female = this.votingForm.get('personsVoted.female')?.value || 0;
    const tg = this.votingForm.get('personsVoted.tg')?.value || 0;

    const total = male + female + tg;

    this.votingForm.get('personsVoted.total')?.setValue(total);
  }






  submitVotingForm(): void {
    if (this.votingForm.invalid) return

    this.http
      .simplePost(`scrutiny`, this.votingForm.value)
      .subscribe({
        next: (resp: any) => {
          // this.toastService.success('Successfully saved!')
          this.votingForm.reset()
          this.router.navigate(['dashboard/file-upload'])
        },
        error: (err) => { },
        complete: () => { },
      });
  }

  patchFormValue() {
    this.votingForm.patchValue({ ...votingFormDetails })
  }


  uploadedFile: File | null = null;

  // Called when a file is selected
  onFileSelected(event: any): void {
    event.preventDefault();
    const file: File = event.target.files[0];
    if (file) {
      const duration = 2000; // Total duration of 2 seconds
      const interval = 50;   // Update interval (in ms)
      const step = 100 / (duration / interval); // Progress increment per interval

      this.progressValue = 0; // Reset the progress to 0 before starting

      const progressInterval = setInterval(() => {
        this.progressValue += step;
        if (this.progressValue >= 100) {
          clearInterval(progressInterval); // Stop the interval when progress is 100%
          this.progressValue = 100; // Ensure it stays at 100
          this.patchFormValue(); // Call your function when progress completes

          // Reset the progress value to 0 after a delay (e.g., 1 second)
          setTimeout(() => {
            this.progressValue = 0;
          }, 1000); // Reset after 1 second
        }
      }, interval);
    }
  }


  // Called when preview button is clicked
  previewFile(): void {
    // if (this.uploadedFile) {
    //   // You can open the file or preview it in a new window/tab
    //   const fileURL = URL.createObjectURL(this.uploadedFile);
    //   window.open(fileURL, '_blank');
    // }
    this.votingForm.patchValue({ ...votingFormDetails })

  }

  progressValue: number = 0

}
