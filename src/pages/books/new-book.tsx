import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { newBookFormSchema } from "@/lib/schema";
import { api } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

function NewBook({ update }: { update: () => void }) {
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof newBookFormSchema>>({
    resolver: zodResolver(newBookFormSchema),
    defaultValues: {
      author: "",
      description: "",
      name: "",
      publisher: "",
    },
  });

  function onSubmit(values: z.infer<typeof newBookFormSchema>) {
    setDisabled(true);
    console.log(values);
    api
      .post("/api/Books", {
        ...values,
        createdDate: new Date().toISOString(),
      })
      .then(() => {
        setOpen(false);
        update();
        toast("Book uploaded", { type: "success" });
      })
      .catch((e) => toast(e.message))
      .finally(() => setDisabled(false));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Upload a Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Upload a Book</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <>
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        autoComplete="off"
                        {...field}
                        id="name"
                        placeholder="Book Name"
                        className="col-span-3"
                      />
                      <FormMessage className="col-span-4 text-center" />
                    </>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <>
                      <Label htmlFor="author" className="text-right">
                        Author
                      </Label>
                      <Input
                        autoComplete="off"
                        {...field}
                        id="author"
                        placeholder="Author"
                        className="col-span-3"
                      />
                      <FormMessage className="col-span-4 text-center" />
                    </>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <>
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Textarea
                        {...field}
                        id="description"
                        placeholder="Description"
                        className="col-span-3"
                      />
                      <FormMessage className="col-span-4 text-center" />
                    </>
                  )}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-x-4 gap-y-2">
                <FormField
                  control={form.control}
                  name="publisher"
                  render={({ field }) => (
                    <>
                      <Label htmlFor="publisher" className="text-right">
                        Publisher
                      </Label>
                      <Input
                        autoComplete="off"
                        {...field}
                        id="publisher"
                        placeholder="Publisher"
                        className="col-span-3"
                      />
                      <FormMessage className="col-span-4 text-center" />
                    </>
                  )}
                />
              </div>
              <div className="mt-5">
                <Button
                  disabled={disabled}
                  type="submit"
                  className="ml-auto block"
                >
                  Upload
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default NewBook;
