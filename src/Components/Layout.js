import React, { Component, Suspense } from 'react';  
import LeftSideBar from './LeftSideBar';  
import Header from './header'  
import Footer from './footer'  
 
export class Layout extends Component {  
    render() {  
        return (  
            <div>  
                <div id="wrapper">  
                    <LeftSideBar></LeftSideBar>  
                    <div id="content-wrapper" class="d-flex flex-column">  
                        <div id="content">  
                            <Header />   
                        </div>  
                        <Footer />  
                    </div>  
                </div>  
            </div>  
        )  
    }  
}  
  
export default Layout 