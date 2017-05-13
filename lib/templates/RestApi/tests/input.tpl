process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let <% this.name %>Model = require('../app/models/<% this.name %>Model');

let chalk       = require('chalk');
let CLI         = require('clui');
let figlet      = require('figlet');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

process.stdout.write('\033c');

console.log(
   chalk.yellow(
    figlet.textSync('Test', { horizontalLayout: 'full' })
   )
);

chai.use(chaiHttp);

describe('<% this.name %>s', () => {
    beforeEach((done) => {
        <% this.name %>Model.remove({}, (err) => { 
           done();         
        });     
    });
  describe('/GET <% this.name %>', () => {
      it('it should GET all the <% this.name %>s', (done) => {
            chai.request(server)
            .get('/api/<% this.name %>s')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  describe('/POST <% this.name %>', () => {
      
      it('it should POST a <% this.name %> ', (done) => {
        let <% this.name %> = {
            <% for(var index in this.fields){%>
              <% if(this.fields[index].type.name === 'default'){%>
               <% if(this.fields[index].type.value === 'String'){%>
                  <% this.fields[index].name %> : 'xxx',
               <%}%>
               <% if(this.fields[index].type.value === 'Number'){%>
                  <% this.fields[index].name %> : 10,
               <%}%>
              <%}%>
            <%}%>
        }
            chai.request(server)
            .post('/api/<% this.name %>s')
            .send(<% this.name %>)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('<% this.name %> created!');
                <% for(var index in this.fields){%>
                 res.body.<% this.name %>.should.have.property('<% this.fields[index].name %>');
                <%}%>
              done();
            });
      });
  });
  /**
  * Test the /GET/:id route , get by Id
  */
  describe('/GET/:id <% this.name %>', () => {
      it('it should GET a <% this.name %> by the given id', (done) => {
        let <% this.name %> = new <% this.name %>Model({ 
          <% for(var index in this.fields){%>
              <% if(this.fields[index].type.name === 'default'){%>
               <% if(this.fields[index].type.value === 'String'){%>
                  <% this.fields[index].name %> : 'xxx',
               <%}%>
               <% if(this.fields[index].type.value === 'Number'){%>
                  <% this.fields[index].name %> : 10,
               <%}%>
              <%}%>
            <%}%>
         }
        );
        <% this.name %>.save((err, <% this.name %>) => {
            chai.request(server)
            .get('/api/<% this.name %>s/' + <% this.name %>.id)
            .send(<% this.name %>)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                <% for(var index in this.fields){%>
                 res.body.should.have.property('<% this.fields[index].name %>');
                <%}%>
                res.body.should.have.property('_id').eql(<% this.name %>.id);
              done();
            });
        });

      });
  });
  /**
  * Test the /PUT/:id route , updating
  */
  describe('/PUT/:id <% this.name %>', () => {
      it('it should UPDATE a <% this.name %> given the id', (done) => {
        let <% this.name %> = new <% this.name %>Model({ 
          <% for(var index in this.fields){%>
              <% if(this.fields[index].type.name === 'default'){%>
               <% if(this.fields[index].type.value === 'String'){%>
                  <% this.fields[index].name %> : 'xxx',
               <%}%>
               <% if(this.fields[index].type.value === 'Number'){%>
                  <% this.fields[index].name %> : 10,
               <%}%>
              <%}%>
            <%}%>
         }
        );
        <% this.name %>.save((err, <% this.name %>) => {
                chai.request(server)
                .put('/api/<% this.name %>s/' + <% this.name %>.id)
                .send({
                 <% for(var index in this.fields){%>
                  <% if(this.fields[index].type.name === 'default'){%>
                  <% if(this.fields[index].type.value === 'String'){%>
                  <% this.fields[index].name %> : 'yyy',
                  <%}%>
                  <% if(this.fields[index].type.value === 'Number'){%>
                  <% this.fields[index].name %> : 11,
                  <%}%>
                 <%}%>
                <%}%>
                 })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('<% this.name %> updated!');
                    
                    <% for(var index in this.fields){%>
                      <% if(this.fields[index].type.value === 'Number'){%>
                        res.body.<% this.name %>.should.have.property('<%this.fields[index].name%>').eql(11);
                      <%}%>
                    <%}%>
                  done();
                });
          });
      });
  });
 /**
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id <% this.name %>', () => {
      it('it should DELETE a <% this.name %> given the id', (done) => {
        let <% this.name %> = new <% this.name %>Model({ 
          <% for(var index in this.fields){%>
              <% if(this.fields[index].type.name === 'default'){%>
               <% if(this.fields[index].type.value === 'String'){%>
                  <% this.fields[index].name %> : 'xxx',
               <%}%>
               <% if(this.fields[index].type.value === 'Number'){%>
                  <% this.fields[index].name %> : 10,
               <%}%>
              <%}%>
            <%}%>
         }
        );
        <% this.name %>.save((err, <% this.name %>) => {
                chai.request(server)
                .delete('/api/<% this.name %>s/' + <% this.name %>.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Successfully deleted');
                    //res.body.result.should.have.property('ok').eql(1);
                    //res.body.result.should.have.property('n').eql(1);
                  done();
                });
          });
      });
  });
});