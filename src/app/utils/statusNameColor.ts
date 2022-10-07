export const statusNameColor = (name: string) => {

  switch(name) {
    case "Suspendido":
      return false;
      break;
    case "Sospechoso":
      return false;
      break;
    case "Bloqueado":
      return false;
      break;
    case "Retrasado":
      return false;
      break;
    case "Cancelado":
      return false;
      break;
    case "Devuelto":
      return false;
      break;
    case "Remaquilado":
      return false;
      break;
    case "Inactivo":
      return false;
      break;
    default:
      return true;
  }

}
