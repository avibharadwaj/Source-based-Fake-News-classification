###### Libraries

library(ggplot2)
library(dplyr)
library(tibble)

###### Loading datasets

kaggle_gr <- read.csv('//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//Datasets//kaggle_gr_clean.csv')
liar_train <- read.table("//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//Datasets//liar_train.tsv", 
                          sep="\t" ,skip =0, header = FALSE, 
                          comment.char = "",check.names = FALSE, quote="",
                          na.strings=c(" ") )
liar_test <- read.table("//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//Datasets//liar_test.tsv", 
                        sep="\t" ,skip =0, header = FALSE, 
                        comment.char = "",check.names = FALSE, quote="",
                        na.strings=c(" ") )
liar_valid <- read.table("//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//Datasets//liar_valid.tsv", 
                         sep="\t" ,skip =0, header = FALSE, 
                         comment.char = "",check.names = FALSE, quote="",
                         na.strings=c(" ") )
politico_r <- read.csv('//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//Datasets//politifact_real.csv')
newsFN <- read.csv('//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//Datasets//newsFN.csv')


####### Data renames

names(liar_train) <- c('ID', 'label', 'statement', 'subject', 'speaker', 'speaker_job','state','party','barely_true_counts','false_counts','half_true_counts','mostly_true_counts','pants_on_fire_counts','context')
names(liar_test) <- c('ID', 'label', 'statement', 'subject', 'speaker', 'speaker_job','state','party','barely_true_counts','false_counts','half_true_counts','mostly_true_counts','pants_on_fire_counts','context')
names(liar_valid) <- c('ID', 'label', 'statement', 'subject', 'speaker', 'speaker_job','state','party','barely_true_counts','false_counts','half_true_counts','mostly_true_counts','pants_on_fire_counts','context')


###### view column names

names(kaggle_gr)
names(liar_train)
names(liar_test)
names(liar_valid)
names(politico_r)
names(newsFN)

####### primal notations

table(liar_train$label)
table(liar_test$label)
table(liar_valid$label)

summary(liar_train)

table(liar_train$party)

########### Liar
  
  ##### pre-processing 
  
  ## converting into only 3 brackets
  # barely true, half true -> undecided
  # true, mostly true -> true
  # pants-fire, false -> false
  
  liar_train$undecided_counts = liar_train$barely_true_counts + liar_train$half_true_counts
  liar_train$true_counts = liar_train$mostly_true_counts
  liar_train$fake_counts = liar_train$pants_on_fire_counts + liar_train$false_counts
  
  #names(liar_train)
  #head(liar_train)
  
  liar_train <- liar_train[ ,!(colnames(liar_train) %in% c("false_counts", "pants_on_fire_counts","mostly_true_counts",
                                             "half_true_counts", "barely_true_counts"))]
  liar_train$label <- as.character(liar_train$label)
  liar_train$label <- ifelse(liar_train$label == "barely-true", "undecided", liar_train$label)
  liar_train$label <- ifelse(liar_train$label == "half-true", "undecided", liar_train$label)
  liar_train$label <- ifelse(liar_train$label == "pants-fire", "fake", liar_train$label)
  liar_train$label <- ifelse(liar_train$label == "false", "fake", liar_train$label)
  liar_train$label <- ifelse(liar_train$label == "mostly-true", "true", liar_train$label)
  
  table(liar_train$label)
  
  ###### plotting functions using ggplot2 
  
  # plot -> party 
  top_party <- table(liar_train$party)
  top_party <- liar_train[liar_train$party %in% names(top_party[top_party > 36]), ]
  
  ggplot(top_party) + 
    geom_bar(aes(x = factor(top_party$party), fill = top_party$label)) + 
    xlab("Party") + ggtitle("News labels with respect to party") + 
    labs(fill = "Legend")
  
  # plot -> speaker
  
  top_speaker <- table(liar_train$speaker)
  top_speaker <- liar_train[liar_train$speaker %in% names(top_speaker[top_speaker > 65]), ]
  
  ggplot(top_speaker) + 
    geom_bar(aes(x = factor(top_speaker$speaker), fill = top_speaker$label)) + 
    xlab("Speaker") + ggtitle("News labels with respect to speaker") + 
    labs(fill = "Legend")
  
  # plot -> true_counts
  
  top_true_counts <- table(liar_train$true_counts)
  top_true_counts <- liar_train[liar_train$true_counts %in% names(top_true_counts[top_true_counts > 10]), ]
  
  ggplot(top_true_counts) + 
    geom_bar(aes(x = factor(top_true_counts$true_counts), fill = top_true_counts$label), position = "fill") + 
    xlab("Value of true counts") + ggtitle("News labels with respect to history of true counts") + 
    labs(fill = "Legend")
  
  # plot -> undecided_counts
  
  top_undecided_counts <- table(liar_train$undecided_counts)
  top_undecided_counts <- liar_train[liar_train$undecided_counts %in% names(top_undecided_counts[top_undecided_counts > -1]), ]
  
  ggplot(top_undecided_counts) + 
    geom_bar(aes(x = factor(top_undecided_counts$true_counts), fill = top_undecided_counts$label), position = "fill") + 
    xlab("Value of undecided counts") + ggtitle("News labels with respect to history of undecided counts") + 
    labs(fill = "Legend")
  
  # plot -> fake_counts
  
  top_fake_counts <- table(liar_train$true_counts)
  top_fake_counts <- liar_train[liar_train$fake_counts %in% names(top_fake_counts[top_fake_counts > -1]), ]
  
  ggplot(top_fake_counts) +
    geom_bar(aes(x = factor(top_fake_counts$fake_counts), fill = top_fake_counts$label), position = "fill") +
    xlab("Value of fake counts") + ggtitle("News labels with respect to history of fake counts") +
    labs(fill = "legend")
  
  # plot -> context
  
  top_context <- table(liar_train$context)
  top_context <- liar_train[liar_train$context %in% names(top_context[top_context > 60]), ]
  
  ggplot(top_context) +
    geom_bar(aes(x = factor(top_context$context), fill = top_context$label), position = "fill") +
    xlab("Context") + ggtitle("News labels with respect to context") +
    labs(fill = "legend")
  
  # plot -> state
  
  top_state <- table(liar_train$state)
  top_state <- liar_train[liar_train$state %in% names(top_state[top_state > 60]), ]
  
  ggplot(top_state) +
    geom_bar(aes(x = factor(top_state$state), fill = top_state$label), position = "fill") +
    xlab("State") + ggtitle("News labels with respect to state") +
    labs(fill = "legend")
  
  # plot -> speaker_job
  
  top_speaker_job <- table(liar_train$speaker_job)
  top_speaker_job <- liar_train[liar_train$speaker_job %in% names(top_speaker_job[top_speaker_job > 75]), ]
  
  ggplot(top_speaker_job) +
    geom_bar(aes(x = factor(top_speaker_job$speaker_job), fill = top_speaker_job$label), position = "fill") +
    xlab("Speaker Job") + ggtitle("News labels with respect to speaker job") +
    labs(fill = "legend")

########### Getting Real with Fake News

  ###### pre-processing
  
  names(kaggle_gr)
  
  # column selection
  kaggle_gr_clean <- kaggle_gr[ ,colnames(kaggle_gr) %in% c( "X", "author", "published", "title", "text",
                                                      "language", "site_url", "main_img_url", "type", "FakeNews",
                                                      "title_without_stopwords", "text_without_stopwords")]
  kaggle_gr_clean$hasImage = ifelse( kaggle_gr_clean$main_img_url == "No Image URL", 0, 1 );
  
  ## label 0 => 'true', 1 => 'false'
  colnames(kaggle_gr_clean)[which(names(kaggle_gr_clean) == "FakeNews")] <- "label"
  
  kaggle_gr_clean$label = ifelse( kaggle_gr_clean$label == 0, "Real", "Fake" )
  
  names(kaggle_gr_clean)
  table(kaggle_gr_clean$hasImage)
  table(kaggle_gr_clean$label)
  class(kaggle_gr_clean$title)
  
  ##### plotting functions using ggplot functions
  
  # plot -> hasImage
  
  ggplot(kaggle_gr_clean) +
    geom_bar(aes(x= as.factor(hasImage), fill = label),position = "dodge")+
    xlab("Images in news") + ylab("counts") + 
    theme() + ggtitle("News category wise images")
  
  # plot -> siteURL
  
  top_sites <- table(kaggle_gr_clean$site_url)
  top_sites <- kaggle_gr_clean[kaggle_gr_clean$site_url %in% names(top_sites[top_sites == 100]),]
  
  ggplot(top_sites) +
    geom_bar(aes(x= as.factor(site_url), fill = label),position = "dodge")+
    xlab("Source of news") + ylab("counts") + 
    theme() + ggtitle("News category wise source")
  
  # plot -> language
  
  ggplot(kaggle_gr_clean) +
    geom_bar(aes(x= as.factor(language), fill = label),position = "fill")+
    xlab("Images in news") + ylab("counts") + 
    theme() + ggtitle("News category wise images")
  
  ## to Work on this
  kaggle_gr_metadata <- data.frame(c(unique(toString(kaggle_gr_clean$author))))
  names(kaggle_gr_metadata) <- c("Author")
  head(kaggle_gr_metadata)
  
  print(kaggle_gr_clean)
  head(kaggle_gr_clean)
  write.csv(kaggle_gr_clean, "final_output.csv")
  
  