import { Component, OnInit } from '@angular/core';
import { TitleServicesService } from 'src/app/services/title/title-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

interface IIconTitleList {
  title: string;
  iconClass: string
};

const iconTitleList: IIconTitleList[] = [
  {
    title: "Bienvenido Usuario",
    iconClass: "bi bi-house-door-fill"
  },
  {
    title: "Usuarios",
    iconClass: "bi bi-people-fill"
  },
  {
    title: "Crear Usuario",
    iconClass: "bi bi-people-fill"
  },
  {
    title: "Empresas",
    iconClass: "bi bi-briefcase-fill"
  },
  {
    title: "Categorias",
    iconClass: "bi bi-archive"
  },
  {
    title: "Asignaciones",
    iconClass: "bi bi-pencil-square"
  },
  {
    title: "Instrucciones",
    iconClass: "bi bi-card-checklist"
  },
  {
    title: "Produccion",
    iconClass: "bi bi-truck-flatbed"
  },
  {
    title: "Despacho",
    iconClass: "bi bi-truck"
  },
  {
    title: "Despacho",
    iconClass: "bi bi-truck"
  },
  {
    title: "Configuracion",
    iconClass: "bi bi-gear"
  },
  {
    title: "Configuracion",
    iconClass: "bi bi-gear"
  },
  {
    title: "Nueva categoria",
    iconClass: "bi bi-plus-circle"
  },
  {
    title: "Nueva empresa",
    iconClass: "bi bi-plus-circle"
  },
  {
    title: "Nuevo proveedor",
    iconClass: "bi bi-plus-circle"
  },
  {
    title: "Roles",
    iconClass: "bi bi-people"
  },
  {
    title: "Nuevo rol",
    iconClass: "bi bi-plus-circle"
  },

];

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  isOpen: boolean = true;
  currentTitle: string = "";

  constructor(
    private titleServices: TitleServicesService,
    public router: Router,
    public activatedRouter: ActivatedRoute,
    public title: Title
  ) { }

  ngOnInit(): void {
    console.log(this.title.getTitle())
    this.currentTitle = this.getCurrentIcon(this.title.getTitle());
    console.log(this.currentTitle);
  }

  buttonSideMenu(): void {
    this.isOpen = !this.isOpen;
  }

  getCurrentIcon(title: string) {

    var className: any = "";

    className = iconTitleList.find((item: IIconTitleList) => {
      return item.title === title;
    })?.iconClass;

    return className;
  }

}
