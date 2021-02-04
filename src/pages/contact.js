import React from 'react'
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from '../components/layout'
import Bio from "../components/bio"




const ContactPage = () => {
  const data = useStaticQuery(graphql`
  {
    site {
      siteMetadata {
        social {
          twitter
        }
      }
    }
  }
  `)


  const social = data.site.siteMetadata?.social
  const twitter_link = social?.twitter

  return (
    < Layout >

      <div class='container'>
        <div class='row my-4'>
          <div class='col'>
            <h2>SNS</h2>
            <Link to={twitter_link}>Twitter</Link>
          </div>
        </div>
        <div class='row my-4'>
          <div class='col'>
            <h2>Contact Form</h2>
            <form name="contact" method="POST" netlify>
              <div className="col-auto mb-4">
                <label htmlFor='name'>
                  お名前
        </label>

                <input type="text" class="form-control mb-2" id="name" placeholder="First Name" />
              </div>

              <div className="col-auto mb-4">
                <label htmlFor='mail'>
                  メールアドレス
        </label>
                <input type="text" class="form-control mb-2" id="mail" placeholder="Mail Address" />

              </div>

              <div className="col-auto mb-4">
                <label htmlFor='inquiry'>
                  内容
        </label>

                <textarea type="text" class="form-control mb-2" id="inquiry" placeholder="Inquiry" />
              </div>

              <div class="col-auto mb-4">
                <button type="submit" class="btn btn-primary mb-2">送信</button>

              </div>

            </form>
          </div>
        </div>
        <div class='row my-4'>
          <div class='col'>
            <Bio />
          </div>
        </div>
      </div>
    </Layout>
  )
}



export default ContactPage

