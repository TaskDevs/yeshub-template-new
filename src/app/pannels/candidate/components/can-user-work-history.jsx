import React from 'react'
import CanProfileCards from './can-profile-cards'

const workHistory = [
  {
    id: "1",
    title: "Senior Developer",
    date: "2019 - Present",
  },
  {
    id: "2",
    title: "Senior Developer",
    date: "2019 - Present",
  },
  {
    id: "3",
    title: "Senior Developer",
    date: "2019 - Present",
  },
]

function CanUserWorkHistory() {
  return (
    <CanProfileCards icon="edit" label="work history" href="#AddWorkHistory">
      {workHistory.map((history) => (
        <div key={history.id} className="">
          <p>{history.title}</p>
          <p>{history.date}</p>
        </div>
      ))}
    </CanProfileCards>
  )
}

export default CanUserWorkHistory