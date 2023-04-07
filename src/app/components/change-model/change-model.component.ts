import {AfterViewInit, Component, Injectable, Input, OnInit} from '@angular/core';
import {ChangeModelServiceService} from "../../services/change-model-service.service";
@Component({
  selector: 'app-change-model',
  templateUrl: './change-model.component.html',
  styleUrls: ['./change-model.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class ChangeModelComponent implements OnInit{
  model: number | undefined;
  @Input()
  model_loaded: string = "";
  private notification: HTMLElement | undefined;
  constructor(private changeModelService: ChangeModelServiceService) { }

  ngOnInit(): void {
    this.notification = document.querySelector('.notificationText') as HTMLElement;
    this.loadModels();
    setTimeout(() => {
      // @ts-ignore
      if(document.getElementById('changeModelPage')) document.getElementById('changeModelPage').style.display = 'block';
    }, 2000);
  }


  loadModels(): void {
    this.changeModelService.loadModels().subscribe((response: []) => {
      const mySelect = document.getElementById('modelType') as HTMLSelectElement;

      response.forEach(model => {
        const newOption = document.createElement('option');
        newOption.value = model;
        newOption.text = model;
        mySelect.appendChild(newOption);
      });
    });
  }

  changeModel(): void {
    // @ts-ignore
    this.notification.innerText = "Loading the model, please wait ...";
    this.notification?.parentElement?.classList.add('showNotification');

    this.changeModelService.changeModel(this.model).subscribe((response) => {
      // @ts-ignore
      this.notification.innerText = response.status;
      this.closeModel();
    });
  }

  closeModel(): void {
    // @ts-ignore
    document.getElementById("changeModelPage").style.transform = "translateY(-200%)"
    // @ts-ignore
    document.getElementById("chat-input").disabled = false;
  }

  openChangeModel() {
    // @ts-ignore
    document.getElementById("changeModelPage").style.transform = "translateY(0)"
    // @ts-ignore
    document.getElementById("chat-input").disabled = true;
  }

  selectedModel(event: Event): void {
    // @ts-ignore
    this.model = event.target.selectedIndex - 1;
  }
}
