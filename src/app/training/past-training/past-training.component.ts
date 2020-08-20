import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from '../training.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = [ 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exchangedSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit(){
    this.exchangedSubscription = this.trainingService.finishedExercisesChanged.subscribe((exercises: Exercise[])=>{
      this.dataSource.data = exercises;
    })
    this.trainingService.fetchCompletedOrcancelledExercise();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(filtervalue: string){
    this.dataSource.filter = filtervalue.trim().toLowerCase();
  }
  ngOnDestroy(){
    this.exchangedSubscription.unsubscribe();
  }
}
