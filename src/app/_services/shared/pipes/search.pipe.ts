import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from 'src/app/_models/contact';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(contacts: Contact[],search:string=""): any[] {
    if(!search.trim()){
      return contacts
    }
    return contacts.filter(contact=>{
      return contact.name.toLowerCase().includes(search.toLowerCase())
    })
  }

}