import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchgroup'
})
export class SearchgroupPipe implements PipeTransform {

  transform(contacts: any[],search:string=""): any[] {
    if(!search.trim()){
      return contacts
    }
    return contacts.filter(contact=>{
      return contact['title'].toLowerCase().includes(search.toLowerCase())
    })
  }
}
