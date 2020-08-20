import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: number;
  @Output() trainingExit = new EventEmitter<void>();

  constructor(private dialog: MatDialog, private trainingService: TrainingService) { }

  ngOnInit() {
    this.onResumeTimer();
  }


  onResumeTimer(){
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000;
    this.timer = setInterval(() =>{
      this.progress = this.progress + 1;
      if(this.progress >=100){
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    },step);
  }




  onStop(){
    clearInterval(this.timer);
    const dialogData = this.dialog.open(StopTrainingComponent, {
      data:{
        progress: this.progress
      }
    });

    dialogData.afterClosed().subscribe(result =>{
      if(result){
        this.trainingService.cancelExercis(this.progress);
      }
      else{
        this.onResumeTimer();
      }
    })
  }
}
