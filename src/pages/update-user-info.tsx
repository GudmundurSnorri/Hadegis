import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import InputContainer from "../components/input-container/InputContainer";
import { createUserInput, createUserSchema } from "../server/DTO/User.dto";
import { trpc } from "../utils/trpc";

const UpdateUserInfo = () => {
  const userMutation = trpc.useMutation("example.updateUserInfo");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserInput>({
    resolver: zodResolver(createUserSchema),
  });


  const onSubmit: SubmitHandler<createUserInput> = async (data) => {
    await userMutation.mutate(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl bg-red-400 mx-auto"
      >
        <button type="submit"> Senda </button>
        <InputContainer>
          <label>Lýsing</label>
          <textarea {...register("description")} className="w-full h-40" />
          {errors.description?.message && <p>{errors.description?.message}</p>}
        </InputContainer>
        <InputContainer>
          <label>Slóð á vefsíðu</label>
          <input className="w-full" {...register("website")} />
          {errors.website?.message && <p>{errors.website?.message}</p>}
        </InputContainer>
        <InputContainer>
          <label> Aha slóð </label>
          <input {...register("ahaId")} className="w-full" />
          {errors.ahaId?.message && <p>{errors.ahaId?.message}</p>}
        </InputContainer>
        <InputContainer>
          <label> Dineout slóð </label>
          <input {...register("dineoutId")} className="w-full" />
          {errors.dineoutId?.message && <p>{errors.dineoutId?.message}</p>}
        </InputContainer>
        <InputContainer>
          <label>Mynd: </label>
          <input {...register("image")} type="url" className="w-full" />
        </InputContainer>
      </form>
    </div>
  );
};

export default UpdateUserInfo;