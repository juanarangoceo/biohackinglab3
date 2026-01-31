"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@/lib/validations";
import { type NewSubscriber } from "@/lib/validations";
import { subscribeUser } from "@/actions/subscriber-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";

export function NewsletterForm() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<NewSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: {
      email: "",
      source: "website_footer", // Hidden field default
      tags: ["newsletter"],
    },
  });

  function onSubmit(data: NewSubscriber) {
    startTransition(async () => {
      const result = await subscribeUser(data);

      if (result.success) {
        toast.success("Welcome to the Lab!", {
          description: result.data?.message || "You have successfully subscribed.",
        });
        form.reset();
      } else {
        toast.error("Subscription failed", {
          description: result.error || "Please try again later.",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-col sm:flex-row gap-3">
                <FormControl>
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter your email"
                      className="pl-9 bg-background/50 border-white/10 focus:border-primary/50 transition-colors"
                      {...field}
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <Button 
                    type="submit" 
                    disabled={isPending} 
                    variant="premium" 
                    className="w-full sm:w-auto min-w-[120px]"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    "Join Now"
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="text-xs text-muted-foreground text-center sm:text-left">
          Join 10,000+ biohackers. No spam, just optimization protocols.
        </p>
      </form>
    </Form>
  );
}
