import { FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {
  calculateTotalSleep,
  DATE,
  SLEEP_START,
  SLEEP_END,
  SLEEP_START_INPUT,
  SLEEP_END_INPUT,
  SUBMIT_INPUT,
  DATE_INPUT,
} from '.'

export type FormValues = {
  sleepStart: string
  sleepEnd: string
  totalSleep: string
  date: string
}

type HomeFormBaseProps = {
  onSubmit: (submitValue: FormValues) => void
  isLoading?: boolean
}

type HomeFormEditProps = {
  variant: 'edit'
  initialValues: FormValues
}

type HomeFormCreateProps = {
  variant: 'create'
}

export type HomeFormProps = (HomeFormEditProps | HomeFormCreateProps) &
  HomeFormBaseProps

export function HomeForm(props: HomeFormProps) {
  const [date, setDate] = useState<string | undefined>(
    props.variant === 'edit' ? props.initialValues.date : undefined,
  )

  const [sleepStart, setSleepStart] = useState<string | undefined>(
    props.variant === 'edit' ? props.initialValues.sleepStart : undefined,
  )

  const [sleepEnd, setSleepEnd] = useState<string | undefined>(
    props.variant === 'edit' ? props.initialValues.sleepEnd : undefined,
  )

  const [totalSleep, setTotalSleep] = useState<string | undefined>(
    props.variant === 'edit' ? props.initialValues.totalSleep : undefined,
  )

  const isEmptyForm = Boolean(!date && !sleepStart && !sleepEnd)

  useEffect(() => {
    setTotalSleep(
      calculateTotalSleep({ date, sleepStart, sleepEnd }) ?? undefined,
    )
  }, [sleepEnd, sleepStart, date])

  return (
    <VStack
      spacing="8"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()

        if (sleepStart && sleepEnd && totalSleep && date) {
          props.onSubmit({
            sleepStart,
            sleepEnd,
            totalSleep,
            date,
          })
        }
      }}
    >
      <VStack alignItems="stretch" spacing="6" w="100%">
        <FormControl isRequired isInvalid={false}>
          <FormLabel>{DATE}</FormLabel>
          <Input
            data-testid={DATE_INPUT}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={props.isLoading}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>{SLEEP_START}</FormLabel>
          <Input
            data-testid={SLEEP_START_INPUT}
            type="time"
            value={sleepStart}
            onChange={(e) => setSleepStart(e.target.value)}
            disabled={props.isLoading}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>{SLEEP_END}</FormLabel>
          <Input
            data-testid={SLEEP_END_INPUT}
            type="time"
            value={sleepEnd}
            onChange={(e) => setSleepEnd(e.target.value)}
            disabled={props.isLoading}
          />
        </FormControl>
      </VStack>
      {totalSleep && <Text>Total sleep: {totalSleep}</Text>}
      <Input
        type="submit"
        cursor="pointer"
        disabled={isEmptyForm || props.isLoading}
        value={SUBMIT_INPUT}
      />
    </VStack>
  )
}

export default HomeForm
