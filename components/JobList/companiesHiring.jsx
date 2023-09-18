import JobsByLoader from 'components/JobsByLoader/JobsByLoader';
import constant from 'constant';
import React from 'react'
import Loader from 'components/common/HeaderLoader/index'



const companiesHiring = (props) => {

    const { TOP_COMPANY_IMAGES ,JOB_COUNT} = props
    return (
        <React.Fragment>
            <div className="roz-company-hiring mb-30">
                {TOP_COMPANY_IMAGES===undefined?<Loader/>:
                <div className="company-hiring">
                    <div className="company-hiring-text">
                        <h3>Companies Hiring</h3>
                    </div>
                    <div className="company-hiring-view">
                        <a
                            target="_blank"
                            href={constant.component.jobsByCompany.url}
                        >
                            View All
                        </a>
                    </div>
                </div>}
                {TOP_COMPANY_IMAGES===undefined?<Loader/>:
                <div className="company-hiring-logo inner-company-logo">
                    {TOP_COMPANY_IMAGES &&
                        TOP_COMPANY_IMAGES.length > 0 &&
                        TOP_COMPANY_IMAGES.map((item, index) => {
                            if (index < 6) {
                                return (
                                    <a
                                        href={constant.component.joblist.url.replace(
                                            ":url",
                                            `${item.URL}-jobs`
                                        )}
                                        target="_blank"
                                    >
                                        <img
                                            src={`${process.env.NEXT_PUBLIC_BASE_URL}/company/logo/${item.COMPANY_LOGO}`}
                                            alt={item.COMPANY_NAME}
                                        />
                                    </a>
                                );
                            }
                        })}
                </div>}
            </div>

        </React.Fragment>
    )
}
export default companiesHiring