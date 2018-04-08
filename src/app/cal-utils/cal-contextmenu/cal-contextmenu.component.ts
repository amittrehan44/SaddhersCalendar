import { Component, ViewChild, Input, Output, EventEmitter  } from '@angular/core';

import { ContextMenuService, ContextMenuComponent } from 'ngx-contextmenu/lib';

@Component({
  selector: 'app-cal-contextmenu',
  templateUrl: './cal-contextmenu.component.html',
  styleUrls: ['./cal-contextmenu.component.css'],
  
})
export class CalContextmenuComponent  {
 @Input()   public items = [
        { name: 'Add', otherProperty: 'Foo' },
        { name: 'Edit', otherProperty: 'Bar' }
    ];
 @Output() notify: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

    constructor(private contextMenuService: ContextMenuService) { }

    public showMessage(message: string): void {
        
        console.log(message);

    }

    public onClick(): void {
        console.log('inside onClick() method!');
        this.notify.emit('notify emit clicked!');

    }

    

}
