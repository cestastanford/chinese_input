library("readr")
library("dplyr")
library("tidyr")

d <- read_csv("data/Madman_Segment5.csv")

#d[, 24] <- NULL # Drop empty column `IME` with duplicated name

# Get the long data first, omitting the rows at the bottom
d_long <- d %>%
  filter(Trial_Name != "MasterTokenID",
         Trial_Name != "DNA_Type(PLEASEDOUBLECHECK!)",
         Trial_Name != "CodeOfCorrespondingChinese-SeeOtherSheet",
         Trial_Name != "SCREEN OUTPUT",
         Trial_Name != "TRANSLATION") %>%
  gather(master_token_id, master_token_val, 6:27)

# Get a lookup table of DNA (row 8) and master tokens (row 9)
dna_to_master_token <- data_frame(
  dna_type = d[5,6:27] %>% unlist(use.names = FALSE),
  master_token_id = d[7,6:27] %>% unlist(use.names = FALSE)
)

chinese_to_token <- data.frame(
  chinese_master_id = d[6, 6:27] %>% unlist(use.names = FALSE),
  master_token_id = d[7, 6:27] %>% unlist(use.names = FALSE)
)

# Join those together. The mutate is because `gather()` always creates a factor
out <- d_long %>%
  mutate(master_token_id = as.character(master_token_id)) %>% # avoid warning
  left_join(dna_to_master_token, by = "master_token_id")

out2 <- out %>%
  mutate(master_token_id = as.character(master_token_id)) %>%
  left_join(chinese_to_token, by = "master_token_id")

out2$segment <- paste("5")
out2$text_seg_id <- paste(out2$Trial_Text, out2$segment, sep="_")
colnames(out2) <- c("trial_name","trial_id","session","trial","trial_text","keylog","editor","operating_system","age_group","dialect","gender","character_type","trial_date","uniq","token","token_type","chinese_id","segment","text_seg_id")

# Clear rows with missing tokens
out2 <- out2 %>% 
  filter(!is.na(token))

write.csv(out2, "data/madmantextseg5.csv", na="", row.names=FALSE)
