###### Libraries



###### Loading datasets

kaggle_gr <- read.csv('//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//kaggle_fake.csv')
liar_train <- read.table(file = '//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//liar_train.tsv', sep = '\t', fill = TRUE)
liar_test <- read.table(file = '//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//liar_test.tsv', sep = '\t', fill = TRUE)
liar_valid <- read.table(file = '//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//liar_valid.tsv', sep = '\t', fill = TRUE)
politico_r <- read.csv('//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//politifact_real.csv')
newsFN <- read.csv('//Users//parshvabarbhaya//Desktop//College//Projects//Fake-News-Detector//newsFN.csv')


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