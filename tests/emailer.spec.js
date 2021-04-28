const chai = require('chai')
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const nodemailer = require('nodemailer')
const test = require('firebase-functions-test')()
const emailer = require('../src/emailer')

chai.should()
chai.use(sinonChai)
const { should } = chai

describe('Email', () => {
  describe('sendEmail', () => {
    beforeEach((done) => {
      sinon.stub(console, 'debug').returns()
      sinon.stub(console, 'info').returns()
      sinon.stub(console, 'error').returns()
      done()
    })

    afterEach((done) => {
      sinon.restore()
      done()
    })

    it('Should catch an exception if anything goes wrong', async () => {
      sinon.stub(nodemailer, 'createTransport').get(() => {
        return () => {
          return {
            sendMail: () => {
              throw new Error('EMAIL')
            },
          }
        }
      })
      test.mockConfig({
        gmail: {
          login: 'login',
          password: 'password',
        },
      })

      try {
        await emailer.sendEmail('email', 'subject', 'content')
      } catch (err) {
        should().exist(err)
        err.message.should.equal('EMAIL')
      }
      console.error.should.be.calledOnce
    })

    it('Should send an email', async () => {
      sinon.stub(nodemailer, 'createTransport').get(() => {
        return () => {
          return {
            sendMail: () => {
              return {}
            },
          }
        }
      })
      test.mockConfig({
        gmail: {
          login: 'login',
          password: 'password',
        },
      })

      await emailer.sendEmail('email', 'subject', 'content')
      console.error.should.not.be.called
    })
  })
})
