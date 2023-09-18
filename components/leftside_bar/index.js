import { useRouter, withRouter } from 'next/router'
import React, { useState } from 'react'

function index() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState(1)
  return (

    <React.Fragment>
      <ul className="right-bar">
        <li>
          <a className={`${activeTab == 1 && 'active'} navigation__link`} href='#1' onClick={() => { setActiveTab(1) }}> Personal Info</a>
        </li>
        <li>
          <a className={`${activeTab == 2 && 'active'} navigation__link`} href='#2' onClick={() => { setActiveTab(2) }}>Add Educations </a>
        </li>
        <li>
          <a className={`${activeTab == 3 && 'active'} navigation__link`} href='#3' onClick={() => { setActiveTab(3) }}>Add Experiences</a>
        </li>
        <li>
          <a className={`${activeTab == 4 && 'active'} navigation__link`} href='#4' onClick={() => { setActiveTab(4) }}>Add Projects</a>
        </li>
        <li>
          <a className={`${activeTab == 5 && 'active'} navigation__link`} href='#5' onClick={() => { setActiveTab(5) }}> Add Skills</a>
        </li>
        <li>
          <a className={`${activeTab == 6 && 'active'} navigation__link`} href='#6' onClick={() => { setActiveTab(6) }}>Add Languages</a>
        </li>
        <li>
          <a className={`${activeTab == 7 && 'active'} navigation__link`} href='#7' onClick={() => { setActiveTab(7) }}>Add Social Links </a>
        </li>
        <li>
          <a className={`${activeTab == 8 && 'active'} navigation__link`} href='#8' onClick={() => { setActiveTab(8) }}>Add Interests  </a>
        </li>
      </ul>

    </React.Fragment>
  )
}

export default withRouter(index);