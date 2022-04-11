import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Item, ItemStatus } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public data: Item[] = [
    {
      id: '1',
      name: 'Get Dog Food',
      status: ItemStatus.Todo
    },
    {
      id: '2',
      name: 'Fetch Water',
      status: ItemStatus.Todo
    },
    {
      id: '3',
      name: 'Go On a Walk',
      status: ItemStatus.Complete
    },
    {
      id: '4',
      name: 'Cook Dinner',
      status: ItemStatus.Todo
    },
    {
      id: '5',
      name: 'Watch a Movie',
      status: ItemStatus.InProgress
    },
    {
      id: '6',
      name: 'Till the Field',
      status: ItemStatus.Complete
    },
    {
      id: '7',
      name: 'Plant Crops',
      status: ItemStatus.Complete
    },
    {
      id: '8',
      name: 'Harvest Crops',
      status: ItemStatus.InProgress
    }
  ];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['id', 'name', 'status'];
  dataSource = new MatTableDataSource(this.data);
  statusList: string[] = [
    'Complete',
    'In Progress',
    'To Do'
  ];
  itemStatus: string = '';
  statusFormControl: FormControl = new FormControl();

  ngOnInit() {
    this.dataSource.filterPredicate = function (data, filter: string): boolean {
      return data.name.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  searchByName(event: any) {
    this.dataSource.data = this.data.filter(e => {
      if (this.itemStatus) return e.status === this.itemStatus;
      else return true;
    });
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.data = this.dataSource.filteredData.map((e, index) => {
      return {
        id: `${index + 1}`,
        name: e.name,
        status: e.status
      }
    });
  }

  filterByStatus(event: any) {
    this.itemStatus = event.source.value;
    this.dataSource.data = this.data.filter(e => {
      if (this.input.nativeElement.value) return e.name.toLowerCase().includes(this.input.nativeElement.value.trim().toLowerCase());
      else return true;
    });
    this.dataSource.data = this.dataSource.data.filter(e => e.status === this.itemStatus);
    this.dataSource.data = this.dataSource.data.map((e, index) => {
      return {
        id: `${index + 1}`,
        name: e.name,
        status: e.status
      }
    });
  }

  onResetFilters() {
    this.input.nativeElement.value = '';
    this.itemStatus = '';
    this.searchByName({ target: { value: '' } });
  }
}
