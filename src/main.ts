import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

//this is to STV1 test git merge
//this is to test git merge
//this is to STV1 test git merge
//this is to STV1 test git merge
import { environment } from './environments/environment';

import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
Amplify.configure(aws_exports);

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
