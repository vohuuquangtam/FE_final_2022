import React from 'react'
import { useAuth } from '../../../contexts/auth'
import ScheduleTrainer from '../../ProfileModule/Schedule/ScheduleTrainer'


export default function CardTopicsRight() {
  const {user} = useAuth();
  return (
    <div style={{ position: "sticky", top: "90px"}}>
      {user && <ScheduleTrainer user={user} />}
    </div>
  )
}
