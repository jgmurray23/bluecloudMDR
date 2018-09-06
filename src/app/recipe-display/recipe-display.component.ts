import {Component, OnInit, ViewChild} from '@angular/core';
// import {Recipe} from '../model/tray';
import {DataSource} from '@angular/cdk/collections';
import {Observable} from 'rxjs/Observable';
import {RecipeService} from '../services/recipe.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {TrayItem} from '../model/TrayItem';
import {LoginxferService} from '../services/loginxfer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'recipe-display',
  templateUrl: './recipe-display.component.html',
  styleUrls: ['./recipe-display.component.css']
})
export class RecipeDisplayComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  value = 'peaceout';

  trayItem: TrayItem = new TrayItem();
  recipes: TrayItem[] = [];
  vencats: Map<string, string>;

// 7dc29e4a-991d-43d8-916b-212cb541f12b
  displayedColumns = ['stocknumber', 'vendorcatalognumber', 'qty', 'oqty', 'description', 'Zoom', 'Image'];

  //displayedColumns = ['vendorcatalognumber'];
  dataSource = new MatTableDataSource<TrayItem>();



  constructor( private recipeService: RecipeService, private loginxfer: LoginxferService, private router: Router) { }

  user = '' ;

  ngAfterViewInit() {

    this.user = this.loginxfer.login ;

    console.log('##user: ' + this.user );

    if ( !this.user ) {
      console.log( 'user undefined' );
      this.router.navigate(['/login'] );
    }
    this.dataSource.sort = this.sort;
  }


  ngOnInit() {
    this.trayItem.trayId = '';

  }

  refresh() {
    this.refresh1();
    this.preFilter();
    this.trayItem.trayId = "" ;
    //console.log( this.data.length  );

  }

  refresh1() {
    this.recipeService.getTrayItem( this.trayItem )
      .subscribe(recipesreturned => {
        console.log('refresh method subscribe');
          console.log( recipesreturned ) ;
        //this.dataSource.data = recipesreturned;
          this.recipes = recipesreturned;
          this.preFilter();
          this.dataSource.data = recipesreturned;
        },
        error2 => {
        console.log(error2);
        }
      );
  }
  preFilter(): void {
    console.log('prefilter: ', this.recipes.length );
    let i = 0;
    for ( const  recipe of this.recipes  ) {

      const ted = recipe ;
      //ted.baseVencatURL = 'https://material.angular.io/assets/img/examples/shiba1.jpg' ;
      console.log('ted is: ', ted );
      if ( ted.baseVencatURL === null || ted.baseVencatURL === 'null') {
        ted.baseVencatURL = 'http://google.ca' ;
      }

    }
    console.log('prefilter: length', this.recipes.length );

  }
}

//
// export class RecipeDataSource extends DataSource<any> {
//
//   constructor(private recipeService: RecipeService, private recipe: Recipe  ) {
//     super();
//   }
//   recipes: Observable<Recipe[]> ;
//
//   connect(): Observable<Recipe[]> {
//       return this.recipeService.getRecipe(this.recipe);
//   }
//   disconnect() {}
// }

