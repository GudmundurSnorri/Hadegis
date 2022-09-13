import z from 'zod';

export const whichWeekDay = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
export const whichMonth = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER" ];

export const typeOfOffer = ["DAYOFFER", "MONTHOFFER", "PERIOD"];

export const createOfferSchema = z.object({
    title: z.string().min(3, {message: 'Titill verður að vera lengri en 3 stafir'}),
    description: z.string().min(10, {message: "Lýsing verður að vera lengri en 10 stafir og minni en 2000 stafir"}).max(2000),
    price: z.number(),
    image: z.string().url({message: "Verður að vera slóð"}),
    active: z.boolean(),
    dateFrom: z.date().nullish(),
    dateTo: z.date().nullish(),
    typeOfOffer:  z.enum(["DAYOFFER", "MONTHOFFER", "PERIOD"]),
    whichWeekDay: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).nullish(),
    whichMonth: z.enum(["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER" ]).nullish()
})

export type createOfferInput = z.TypeOf<typeof createOfferSchema>;

