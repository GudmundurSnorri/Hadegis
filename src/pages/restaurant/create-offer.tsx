import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Calendar from "react-calendar";
import { trpc } from "../../utils/trpc";
import "react-calendar/dist/Calendar.css";

import {
  createOfferInput,
  createOfferSchema,
  whichMonth,
  whichWeekDay,
} from "../../server/DTO/Offer.dto";
import InputContainer from "../../components/input-container/InputContainer";
import { Offer } from "@prisma/client";

const Inputs = ({ offer }: { offer: Offer }) => {
  const isAddMode = !offer;
  const [file, setFile] = React.useState<unknown>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<createOfferInput>({
    resolver: zodResolver(createOfferSchema),
    defaultValues: isAddMode
      ? {}
      : {
          title: offer.title,
          price: offer.price,
          description: offer.description,
          image: offer.image || "",
          active: offer.active,
          typeOfOffer: offer.typeOfOffer,
          whichMonth: offer.whichMonth,
          whichWeekDay: offer.whichWeekDay,
          dateTo: offer.dateTo,
          dateFrom: offer.dateFrom,
        },
  });
  const createOfferMutation = trpc.useMutation(["example.createOffer"]);
  const updateOfferMutation = trpc.useMutation(['example.updateOffer']);
  const [value, onChange] = React.useState<Array<Date>>([]);


  const createOffer = (data: createOfferInput) => {
    data.dateFrom = !!value ? value[0] : null;
    data.dateTo = !!value ? value[1] : null;
    createOfferMutation.mutate(data);
  };

  const updateOffer = (data: createOfferInput) => {
    updateOfferMutation.mutate({data: data, id: offer.id})
  }
  const onSubmit: SubmitHandler<createOfferInput> = (data) => {
     isAddMode ? createOffer(data) : updateOffer(data);
  };

  const status = watch("typeOfOffer");
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl bg-red-400 mx-auto"
      >
        <button type="submit"> Senda </button>
        <InputContainer>
          <label>Nafn</label>
          <input {...register("title")} className="w-full" />
          {errors.title?.message && <p>{errors.title?.message}</p>}
        </InputContainer>
        <InputContainer>
          <label>Verð</label>
          <input
            className="w-full"
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price?.message && <p>{errors.price?.message}</p>}
        </InputContainer>
        <InputContainer>
          <label> Lýsing </label>
          <textarea {...register("description")} className="w-full h-40" />
          {errors.description?.message && <p>{errors.description?.message}</p>}
        </InputContainer>
        <InputContainer>
          <label>Mynd: </label>
          <input {...register("image")} type="url" className="w-full" />
        </InputContainer>
        <InputContainer>
          <input {...register("active")} type="checkbox" />
        </InputContainer>
        <InputContainer>
          <label htmlFor="field-day">
            <input
              {...register("typeOfOffer")}
              type="radio"
              name="typeOfOffer"
              value="DAYOFFER"
              id="field-day"
            />
            Rain
          </label>
          <label htmlFor="field-month">
            <input
              {...register("typeOfOffer")}
              type="radio"
              name="typeOfOffer"
              value="MONTHOFFER"
              id="field-month"
            />
            Lots of wind
          </label>
          <label htmlFor="field-period">
            <input
              {...register("typeOfOffer")}
              type="radio"
              name="typeOfOffer"
              value="PERIOD"
              id="field-period"
            />
            Sunny
          </label>
        </InputContainer>

        {status === "DAYOFFER" && (
          <div>
            <select {...register("whichWeekDay")}>
              {whichWeekDay.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        )}
        {status === "MONTHOFFER" && (
          <div>
            <select {...register("whichMonth")}>
              {whichMonth.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
        )}
        {status === "PERIOD" && (
          <div>
            <Calendar onChange={onChange} selectRange />
          </div>
        )}
      </form>
    </div>
  );
};

export default Inputs;
