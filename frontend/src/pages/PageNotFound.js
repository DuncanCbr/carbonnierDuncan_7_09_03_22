import React from 'react'
import {Link} from "react-router-dom";
function PageNotFound() {
return (
<div className='pageNotFound'>
<h1 className='pnfScale'>Impossible de trouver la page recherché.</h1>
<h2>Essayez ce lien: <Link to="/" className='link'> Accueil</Link></h2>
</div>
)
}
export default PageNotFound;