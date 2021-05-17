module.exports = function (ngModule){

    describe('Sample list test', ()=>{
        beforeEach(window.module(ngModule.name));

        it('List should test properly', ()=>{
            expect(true).to.be.true;
        })
    })
} 