import React from 'react'
import { useAuth } from '../../../contexts/auth'
import ScheduleTrainer from '../../ProfileModule/Schedule/ScheduleTrainer'


export default function CardTopicsRight() {
  const {user} = useAuth();
  return (
    <div>
      {user && <ScheduleTrainer user={user} />}
    </div>
  )
}
