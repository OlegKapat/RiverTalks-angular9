import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'useringroup'
})
export class UseringroupPipe implements PipeTransform {

  transform(contacts: any[],search:string=""): any[] {
    if(!search.trim()){
      return contacts
    }
    return contacts.filter(contact=>{
      return contact['name'].toLowerCase().includes(search.toLowerCase())
    })
  }

}
