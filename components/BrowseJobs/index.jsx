import React from 'react'
import constant from 'constant'
import Link from 'next/link'

export default function index( {router} ) {
    
  return (
    <React.Fragment>
     
    <main id="rg-main" className="rg-main rg-haslayout pt-0" >
    <div className="rg-sectionspace rg-haslayout pt-0">
        <div className="rozgar-jobbylocsearch">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-12 col-md-10 col-lg-10 offset-1">
                          
                            { /*<Searchbar /> */}
                           
                        <ul className='jobsbylocation-top jobsbylocation-list'>
                            <li><h1>Browse Jobs</h1></li>
                            <li><Link href={constant.component.AllJobs.url} className={router.pathname === constant.component.AllJobs.url && 'active'}>All Jobs</Link></li>
                            <li><Link href={constant.component.jobsByLocation.url} className={router.pathname === constant.component.jobsByLocation.url && 'active'}>Jobs by Location</Link></li>
                            <li><Link href={constant.component.jobsByCompany.url} className={router.pathname === constant.component.jobsByCompany.url && 'active'}>Jobs by Company</Link></li>
                            <li><Link href={constant.component.jobsByCategory.url} className={router.pathname === constant.component.jobsByCategory.url && 'active'}>Jobs by Category</Link></li>
                            <li><Link href={constant.component.jobsByDesignation.url} className={router.pathname === constant.component.jobsByDesignation.url && 'active'}>Jobs by Designation</Link></li>
                            <li><Link href={constant.component.jobsBySkill.url} className={router.pathname === constant.component.jobsBySkill.url && 'active'}>Jobs by Skill</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div className={router.pathname === constant.component.AllJobs.url ? 'rozgar-browseJobs' : 'rozgar-profile-main-content'}>

            <div className='container p-0'>
                <div className='row' >
                     <div className={'col-md-12 p-0'}>
                            









                    </div>

                    {router.pathname !== constant.component.AllJobs.url && <div className='col-md-3'>

                    </div>}
                    
                </div>
            </div>
        </div>
    </div>
</main>


    </React.Fragment>
  )
}

 