import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import { intervalToDuration, isAfter, isBefore } from 'date-fns'
import React, { useEffect, useState } from 'react'
import {
  formatToHHMM,
  SLEEP_START_ERROR,
  SLEEP_END_ERROR,
  SLEEP_START,
  SLEEP_END,
  SLEEP_START_INPUT,
  SLEEP_END_INPUT,
  SUBMIT_INPUT,
} from '.'

type HomeFormBaseProps = {
  onSubmit: (submitValue: {
    sleepStart: string
    sleepEnd: string
    totalSleep: string
  }) => void
}

type HomeFormEditProps = {
  variant: 'edit'
  initialValues: {
    sleepStart: string
    sleepEnd: string
    totalSleep: string
  }
}

type HomeFormCreateProps = {
  variant: 'create'
}

export type HomeFormProps = (HomeFormEditProps | HomeFormCreateProps) &
  HomeFormBaseProps

export function HomeForm(props: HomeFormProps) {
  const [sleepStart, setSleepStart] = useState<string | undefined>(
    props.variant === 'edit' ? props.initialValues.sleepStart : undefined,
  )
  const [sleepStartError, setSleepStartError] = useState<string | null>(null)

  const [sleepEnd, setSleepEnd] = useState<string | undefined>(
    props.variant === 'edit' ? props.initialValues.sleepEnd : undefined,
  )
  const [sleepEndError, setSleepEndError] = useState<string | null>(null)

  const [totalSleep, setTotalSleep] = useState<string | undefined>(
    props.variant === 'edit' ? props.initialValues.totalSleep : undefined,
  )

  const hasAnyError = Boolean(sleepStartError || sleepEndError)
  const isEmptyForm = Boolean(!sleepStart && !sleepEnd)

  useEffect(() => {
    const validateSleepStart = () => {
      if (isAfter(new Date(sleepStart ?? ''), new Date(sleepEnd ?? ''))) {
        setSleepStartError(SLEEP_START_ERROR)
      } else {
        setSleepStartError(null)
      }
    }

    const validateSleepEnd = () => {
      if (isBefore(new Date(sleepEnd ?? ''), new Date(sleepStart ?? ''))) {
        setSleepEndError(SLEEP_END_ERROR)
      } else {
        setSleepEndError(null)
      }
    }

    if (sleepStart && sleepEnd) {
      validateSleepStart()
      validateSleepEnd()
    }
  }, [sleepStart, sleepEnd])

  useEffect(() => {
    if (hasAnyError) return

    if (sleepStart && sleepEnd) {
      const { hours, minutes } = intervalToDuration({
        start: new Date(sleepStart),
        end: new Date(sleepEnd),
      })

      setTotalSleep(formatToHHMM(hours ?? 0, minutes ?? 0))
    }
  }, [sleepStart, sleepEnd, hasAnyError])

  return (
    <VStack
      spacing="8"
      as="form"
      onSubmit={(e) => {
        e.preventDefault()

        if (sleepStart && sleepEnd && totalSleep) {
          props.onSubmit({
            sleepStart,
            sleepEnd,
            totalSleep,
          })
        }
      }}
    >
      <VStack alignItems="stretch" spacing="6" w="100%">
        <FormControl isRequired isInvalid={Boolean(sleepStartError)}>
          <FormLabel>{SLEEP_START}</FormLabel>
          <Input
            data-testid={SLEEP_START_INPUT}
            type="datetime-local"
            value={sleepStart}
            onChange={(e) => setSleepStart(e.target.value)}
          />

          {sleepStartError && (
            <FormErrorMessage>{sleepStartError}</FormErrorMessage>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={Boolean(sleepEndError)}>
          <FormLabel>{SLEEP_END}</FormLabel>
          <Input
            data-testid={SLEEP_END_INPUT}
            type="datetime-local"
            value={sleepEnd}
            onChange={(e) => setSleepEnd(e.target.value)}
          />

          {sleepEndError && (
            <FormErrorMessage>{sleepEndError}</FormErrorMessage>
          )}
        </FormControl>
      </VStack>
      {!hasAnyError && totalSleep && <Text>Total sleep: {totalSleep}</Text>}
      <Input
        type="submit"
        cursor="pointer"
        disabled={hasAnyError || isEmptyForm}
        value={SUBMIT_INPUT}
      />
    </VStack>
  )
}

export default HomeForm
