import { fakeAsync, flush } from "@angular/core/testing";

fdescribe('Async Testing Examples', () => {

  it('Asynchronous test example with Jasmin done()', (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      console.log('running assertions');
      test = true;
      expect(test).toBeTruthy();

      done();
    }, 1000);
  });

  it('Asynchronous test example - SetTimeOut fakeAsync', fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      console.log('running assertions');
      test = true;
    }, 1000);

    flush();

    expect(test).toBeTruthy();

  }));

});
