import React from 'react';
import './Layout.css'

type LayoutProps = {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = (props) => {
    /*return (
      <div className="main">
        <div className="Header-ido">
            <div className="wow">HEADER</div>
        </div>
        <div  className="Body-ido">
            {props.children}
        </div>
      </div>
    )*/
    return (
      <div  style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'}}>
        <div  style={{width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div>HEADER</div>
        </div>
        <div  style={{width: '100%', flex: 7, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            {props.children}
        </div>
      </div>
    )
}

export default Layout;